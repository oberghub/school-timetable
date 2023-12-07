import { getPool } from "@/libs/prisma";

export async function GET(request: Request) {
  const pool = await getPool();
  const [data, f] = await pool.query(`SELECT * FROM \`room\``);

  return Response.json(data);
}
