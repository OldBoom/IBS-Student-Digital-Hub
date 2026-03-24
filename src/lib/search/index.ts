// Search module — FTS5 full-text search across all content types.
//
// Exports:
//   search(query: SearchQuery): Promise<SearchResult[]>
//
// SearchQuery = { q: string, types?: ContentType[], semester?: number, topicId?: string }
// SearchResult = { id: string, contentType: ContentType, title: string, summary: string, actionUrl: string }
// ContentType = 'document' | 'contact' | 'process' | 'help_article' | 'platform'
//
// Strategy:
// - Query each FTS5 virtual table separately.
// - Apply prefix matching for q.length >= 4 (e.g. append '*' to term).
// - Merge and sort by FTS5 rank score.
// - Apply type/semester/topic filters before returning.

export type ContentType = 'document' | 'contact' | 'process' | 'help_article' | 'platform'

export type SearchResult = {
  id: string
  contentType: ContentType
  title: string
  summary: string
  actionUrl: string
}

// TODO: implement search()
