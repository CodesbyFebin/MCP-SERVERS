import { sql } from '@vercel/postgres';

export interface DbUser {
  id: string;
  email: string;
  password_hash: string;
  name: string;
  company_name: string | null;
  created_at: string;
}

export async function getUserByEmail(email: string): Promise<DbUser | null> {
  const { rows } = await sql<DbUser>`
    SELECT id, email, password_hash, name, company_name, created_at
    FROM users
    WHERE lower(email) = lower(${email})
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function getUserById(id: string): Promise<DbUser | null> {
  const { rows } = await sql<DbUser>`
    SELECT id, email, password_hash, name, company_name, created_at
    FROM users
    WHERE id = ${id}
    LIMIT 1
  `;
  return rows[0] ?? null;
}

export async function createUser(params: {
  email: string;
  passwordHash: string;
  name: string;
  companyName: string | null;
}): Promise<DbUser> {
  const { rows } = await sql<DbUser>`
    INSERT INTO users (email, password_hash, name, company_name)
    VALUES (${params.email}, ${params.passwordHash}, ${params.name}, ${params.companyName})
    RETURNING id, email, password_hash, name, company_name, created_at
  `;
  return rows[0];
}

export interface DbCommunitySubmission {
  id: string;
  post_id: string;
  submission_type: string;
  payload: Record<string, string>;
  submitter_ip_hash: string | null;
  status: string;
  created_at: string;
}

export async function createCommunitySubmission(params: {
  postId: string;
  submissionType: string;
  payload: Record<string, string>;
  submitterIpHash: string | null;
}): Promise<DbCommunitySubmission> {
  const { rows } = await sql<DbCommunitySubmission>`
    INSERT INTO community_submissions (post_id, submission_type, payload, submitter_ip_hash)
    VALUES (${params.postId}, ${params.submissionType}, ${JSON.stringify(params.payload)}::jsonb, ${params.submitterIpHash})
    RETURNING id, post_id, submission_type, payload, submitter_ip_hash, status, created_at
  `;
  return rows[0];
}
