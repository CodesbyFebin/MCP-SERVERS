# Multilingual Architecture

## Overview

The multilingual engine is translation-aware, not route-only. It supports 50 languages with proper terminology management, quality validation, and reciprocal hreflang.

## Translation Workflow

1. English source published
2. Terminology extraction
3. Locale glossary mapping
4. Machine-assisted translation
5. Technical validation
6. Link localisation
7. Metadata localisation
8. Schema localisation
9. Locale QA
10. Human review where required
11. Publish

## Locale Configuration

See `src/lib/multilingual/locale-registry.ts` for the canonical locale registry.

Each locale record includes:
- code
- name
- nativeName
- direction (ltr/rtl)
- enabled
- translationMode (human/machine-assisted/machine)
- requiresHumanReview
- technicalGlossaryId

## Translation Quality Checks

- Script correctness
- Directionality
- Grammar
- Technical terminology
- Untranslated fragments
- Broken punctuation
- Localised headings
- Localised metadata
- Localised anchor text
- Localised screenshots where needed
- Reciprocal hreflang
- Correct canonical
- No locale duplication

## Hreflang Implementation

Use `buildHreflangEntries` and `buildCanonicalWithHreflang` from `src/lib/multilingual/translation/pipeline.ts`.

## Supported Locales

Initial launch:
- en (English)
- hi (Hindi)
- ta (Tamil)
- te (Telugu)
- ml (Malayalam)

Expand after pipeline proves quality:
- mr, bn, gu, kn, pa, ur, zh, ja, ko, es, de, fr, pt, ru, it, and more
