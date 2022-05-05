import { BitError } from '@teambit/bit-error';
import { Consumer } from '@teambit/legacy/dist/consumer';
import { BitIds } from '@teambit/legacy/dist/bit-id';
import Lane, { LaneComponent } from '@teambit/legacy/dist/scope/models/lane';
import WorkspaceLane from '@teambit/legacy/dist/consumer/bit-map/workspace-lane';

export async function createLane(consumer: Consumer, laneName: string, remoteLane?: Lane): Promise<Lane> {
  const lanes = await consumer.scope.listLanes();
  if (lanes.find((lane) => lane.name === laneName)) {
    throw new BitError(`lane "${laneName}" already exists, to switch to this lane, please use "bit switch" command`);
  }
  if (!isValidLaneName(laneName)) {
    throw new BitError(
      `lane "${laneName}" has invalid characters. lane name can only contain alphanumeric, lowercase characters, and the following ["-", "_", "$", "!"]`
    );
  }

  const getDataToPopulateLaneObjectIfNeeded = async (): Promise<LaneComponent[]> => {
    if (remoteLane) return remoteLane.components;
    // when branching from one lane to another, copy components from the origin lane
    // when branching from main, no need to copy anything
    const currentLaneObject = await consumer.getCurrentLaneObject();
    return currentLaneObject ? currentLaneObject.components : [];
  };
  const getDataToPopulateWorkspaceLaneIfNeeded = (): BitIds => {
    if (remoteLane) return new BitIds(); // if remoteLane, this got created when importing a remote lane
    // when branching from one lane to another, copy components from the origin workspace-lane
    // when branching from main, no need to copy anything
    const currentWorkspaceLane = consumer.bitMap.workspaceLane;
    return currentWorkspaceLane ? currentWorkspaceLane.ids : new BitIds();
  };
  const newLane = remoteLane
    ? Lane.from({ name: laneName, hash: remoteLane.hash().toString(), log: remoteLane.log })
    : Lane.create(laneName);
  const dataToPopulate = await getDataToPopulateLaneObjectIfNeeded();
  newLane.setLaneComponents(dataToPopulate);

  await consumer.scope.lanes.saveLane(newLane);

  const workspaceConfig = WorkspaceLane.load(laneName, consumer.scope.getPath());
  workspaceConfig.ids = getDataToPopulateWorkspaceLaneIfNeeded();
  await workspaceConfig.write();

  return newLane;
}

function isValidLaneName(val: unknown): boolean {
  if (typeof val !== 'string') return false;
  // @todo: should we allow slash?
  return /^[$\-_!a-z0-9]+$/.test(val);
}