---
---

-   Storing data in tables inspired by the [tidyverse][tidyverse] and [DataForge][data-forge].
-   Outline

<%- include('/inc/code.html', {file: 'dataframe.js'}) %>

## What basic operations do we need?

-   Constructor

<%- include('/inc/code.html', {file: 'constructor.js'}) %>

-   Equality check

<%- include('/inc/code.html', {file: 'equal.js'}) %>

## How can we choose what data to work with?

-   Drop and select

<%- include('/inc/code.html', {file: 'dropselect.js'}) %>

-   Filter rows

<%- include('/inc/code.html', {file: 'filter.js'}) %>

## How can we create new values?

-   Mutate (add new columns)

<%- include('/inc/code.html', {file: 'mutate.js'}) %>

## How can we arrange values?

-   Sort

<%- include('/inc/code.html', {file: 'sort.js'}) %>

## How can we remove duplicates?

-   Find unique values

<%- include('/inc/code.html', {file: 'unique.js'}) %>

## How can we calculate summaries?

-   Grouping and ungrouping

<%- include('/inc/code.html', {file: 'group.js'}) %>

-   Make a group ID

<%- include('/inc/code.html', {file: 'makegroupid.js'}) %>

-   Summarization

<%- include('/inc/code.html', {file: 'summarize.js'}) %>

-   Standard summarization functions

<%- include('/inc/code.html', {file: 'summarizefuncs.js'}) %>

## How can we combine datasets?

-   Join with another dataframe

<%- include('/inc/code.html', {file: 'join.js'}) %>

-   Join helpers

<%- include('/inc/code.html', {file: 'joinhelpers.js'}) %>

## What's left over?

-   Utilities

<%- include('/inc/code.html', {file: 'utilities.js'}) %>