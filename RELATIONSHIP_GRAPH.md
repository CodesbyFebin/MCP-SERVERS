# Relationship Graph

## Overview

The relationship graph uses typed, directed relationships between entities. All relationships must reference valid entity IDs.

## Valid Relationship Types

- belongs_to
- maintained_by
- developed_by
- implemented_in
- supports
- requires
- compatible_with
- integrates_with
- alternative_to
- compared_with
- uses
- deployed_on
- secured_by
- authenticated_by
- documented_by
- explained_by
- referenced_by
- has_release
- has_vulnerability
- has_benchmark
- listed_in
- recommended_for
- related_to
- deprecated_by
- replaced_by

## Graph Storage

Relationships are stored in the `relationships` table in `db/schema-extended.sql`.

## Validation

Unresolved internal references are rejected during validation. The `validatePublishingGraph` function checks relationship integrity.

## Usage

Use `addRelationship` from `src/data/content-registry/integrations.ts` to build relationships programmatically.
