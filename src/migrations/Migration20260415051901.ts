import { Migration } from '@mikro-orm/migrations';

export class Migration20260415051901 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "profiles" ("id" uuid not null, "bio" varchar(255) null, "avatar_url" varchar(255) null, constraint "profiles_pkey" primary key ("id"));`);

    this.addSql(`create table "tags" ("id" uuid not null, "name" varchar(255) not null, constraint "tags_pkey" primary key ("id"));`);
    this.addSql(`alter table "tags" add constraint "tags_name_unique" unique ("name");`);

    this.addSql(`create table "posts" ("id" uuid not null, "title" varchar(255) not null, "body" text not null, "published" boolean not null default false, "author_id" uuid not null, constraint "posts_pkey" primary key ("id"));`);

    this.addSql(`create table "posts_tags" ("post_id" uuid not null, "tag_id" uuid not null, constraint "posts_tags_pkey" primary key ("post_id", "tag_id"));`);

    this.addSql(`alter table "posts" add constraint "posts_author_id_foreign" foreign key ("author_id") references "users" ("id") on update cascade;`);

    this.addSql(`alter table "posts_tags" add constraint "posts_tags_post_id_foreign" foreign key ("post_id") references "posts" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "posts_tags" add constraint "posts_tags_tag_id_foreign" foreign key ("tag_id") references "tags" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "users" add column "profile_id" uuid null;`);
    this.addSql(`alter table "users" add constraint "users_profile_id_foreign" foreign key ("profile_id") references "profiles" ("id") on update cascade on delete set null;`);
    this.addSql(`alter table "users" add constraint "users_profile_id_unique" unique ("profile_id");`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "users" drop constraint "users_profile_id_foreign";`);

    this.addSql(`alter table "posts_tags" drop constraint "posts_tags_tag_id_foreign";`);

    this.addSql(`alter table "posts_tags" drop constraint "posts_tags_post_id_foreign";`);

    this.addSql(`drop table if exists "profiles" cascade;`);

    this.addSql(`drop table if exists "tags" cascade;`);

    this.addSql(`drop table if exists "posts" cascade;`);

    this.addSql(`drop table if exists "posts_tags" cascade;`);

    this.addSql(`alter table "users" drop constraint "users_profile_id_unique";`);
    this.addSql(`alter table "users" drop column "profile_id";`);
  }

}
