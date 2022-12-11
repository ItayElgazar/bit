import { ImportDeclaration, Node, SyntaxKind } from 'typescript';
import { UnImplementedSchema } from '@teambit/semantics.entities.semantic-schema';
import { SchemaTransformer } from '../schema-transformer';
import { SchemaExtractorContext } from '../schema-extractor-context';
import { Identifier } from '../identifier';

export class ImportDeclarationTransformer implements SchemaTransformer {
  predicate(node: Node) {
    return node.kind === SyntaxKind.ImportDeclaration;
  }

  async getIdentifiers(importDec: ImportDeclaration): Promise<Identifier[]> {
    if (!importDec.importClause) return [];

    const sourceFile = importDec.getSourceFile().fileName;

    // import A from 'a'
    if (!importDec.importClause.namedBindings) {
      return [new Identifier(importDec.importClause.getText(), sourceFile)];
    }

    // import { A } from 'a'
    if (importDec.importClause.namedBindings?.kind === SyntaxKind.NamedImports) {
      const { elements } = importDec.importClause.namedBindings;
      const fileName = importDec.getSourceFile().fileName;

      return elements.map(({ name, propertyName }) => {
        const id = propertyName?.getText() || name.getText();
        const identifier = new Identifier(id, fileName);
        return identifier;
      });
    }

    // import * as A from 'a';
    if (importDec.importClause.namedBindings.kind === SyntaxKind.NamespaceImport) {
      return [new Identifier(importDec.importClause.namedBindings.name.getText(), sourceFile)];
    }

    return [];
  }

  async transform(node: ImportDeclaration, context: SchemaExtractorContext) {
    const location = context.getLocation(node);

    return new UnImplementedSchema(location, node.getText(), node.kind.toString());
  }
}
