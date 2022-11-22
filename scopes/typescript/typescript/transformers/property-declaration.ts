import ts, { Node, PropertyDeclaration } from 'typescript';
import { VariableLikeSchema } from '@teambit/semantics.entities.semantic-schema';
import { SchemaTransformer } from '../schema-transformer';
import { SchemaExtractorContext } from '../schema-extractor-context';
import { ExportIdentifier } from '../export-identifier';
import { parseTypeFromQuickInfo } from './utils/parse-type-from-quick-info';

export class PropertyDeclarationTransformer implements SchemaTransformer {
  predicate(node: Node) {
    return node.kind === ts.SyntaxKind.PropertyDeclaration;
  }

  async getIdentifiers(): Promise<ExportIdentifier[]> {
    return [];
  }

  // @todo - handle arrow function objects
  async transform(node: PropertyDeclaration, context: SchemaExtractorContext) {
    const name = node.name.getText();
    const info = await context.getQuickInfo(node.name);
    const displaySig = info?.body?.displayString;
    const typeStr = parseTypeFromQuickInfo(info);
    const type = await context.resolveType(node, typeStr);
    const isOptional = Boolean(node.questionToken);
    const doc = await context.jsDocToDocSchema(node);
    return new VariableLikeSchema(context.getLocation(node), name, displaySig || '', type, isOptional, doc);
  }
}