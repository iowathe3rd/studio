create extension if not exists "pgcrypto";

create table if not exists "User" (
  "id" uuid not null default gen_random_uuid(),
  "email" varchar(64) not null,
  "password" varchar(64),
  constraint "User_pkey" primary key ("id")
);

create table if not exists "Chat" (
  "id" uuid not null default gen_random_uuid(),
  "createdAt" timestamp not null,
  "title" text not null,
  "userId" uuid not null,
  "visibility" varchar(255) not null default 'private',
  "lastContext" jsonb,
  constraint "Chat_pkey" primary key ("id"),
  constraint "Chat_visibility_check" check ("visibility" in ('public', 'private')),
  constraint "Chat_userId_fkey" foreign key ("userId") references "User"("id")
);

create table if not exists "Message" (
  "id" uuid not null default gen_random_uuid(),
  "chatId" uuid not null,
  "role" varchar not null,
  "content" json not null,
  "createdAt" timestamp not null,
  constraint "Message_pkey" primary key ("id"),
  constraint "Message_chatId_fkey" foreign key ("chatId") references "Chat"("id")
);

create table if not exists "Message_v2" (
  "id" uuid not null default gen_random_uuid(),
  "chatId" uuid not null,
  "role" varchar not null,
  "parts" json not null,
  "attachments" json not null,
  "createdAt" timestamp not null,
  constraint "Message_v2_pkey" primary key ("id"),
  constraint "Message_v2_chatId_fkey" foreign key ("chatId") references "Chat"("id")
);

create table if not exists "Vote" (
  "chatId" uuid not null,
  "messageId" uuid not null,
  "isUpvoted" boolean not null,
  constraint "Vote_pkey" primary key ("chatId", "messageId"),
  constraint "Vote_chatId_fkey" foreign key ("chatId") references "Chat"("id"),
  constraint "Vote_messageId_fkey" foreign key ("messageId") references "Message"("id")
);

create table if not exists "Vote_v2" (
  "chatId" uuid not null,
  "messageId" uuid not null,
  "isUpvoted" boolean not null,
  constraint "Vote_v2_pkey" primary key ("chatId", "messageId"),
  constraint "Vote_v2_chatId_fkey" foreign key ("chatId") references "Chat"("id"),
  constraint "Vote_v2_messageId_fkey" foreign key ("messageId") references "Message_v2"("id")
);

create table if not exists "Document" (
  "id" uuid not null default gen_random_uuid(),
  "createdAt" timestamp not null,
  "title" text not null,
  "content" text,
  "text" varchar(255) not null default 'text',
  "userId" uuid not null,
  constraint "Document_pkey" primary key ("id", "createdAt"),
  constraint "Document_text_check" check ("text" in ('text', 'code', 'image', 'sheet')),
  constraint "Document_userId_fkey" foreign key ("userId") references "User"("id")
);

create table if not exists "Suggestion" (
  "id" uuid not null default gen_random_uuid(),
  "documentId" uuid not null,
  "documentCreatedAt" timestamp not null,
  "originalText" text not null,
  "suggestedText" text not null,
  "description" text,
  "isResolved" boolean not null default false,
  "userId" uuid not null,
  "createdAt" timestamp not null,
  constraint "Suggestion_pkey" primary key ("id"),
  constraint "Suggestion_document_ref_fkey" foreign key ("documentId", "documentCreatedAt") references "Document"("id", "createdAt"),
  constraint "Suggestion_userId_fkey" foreign key ("userId") references "User"("id")
);

create table if not exists "Stream" (
  "id" uuid not null default gen_random_uuid(),
  "chatId" uuid not null,
  "createdAt" timestamp not null,
  constraint "Stream_pkey" primary key ("id"),
  constraint "Stream_chatId_fkey" foreign key ("chatId") references "Chat"("id")
);
