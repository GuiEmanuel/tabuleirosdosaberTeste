export const runtime = "nodejs";

import database from "@/database/database";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const idSalaParam = searchParams.get("id_sala");

    const idSala = Number(idSalaParam);

    if (!idSala || Number.isNaN(idSala)) {
      return Response.json(
        { error: "id_sala inválido" },
        { status: 400 }
      );
    }

    const sql = `
      SELECT * 
      FROM jogos 
      WHERE id_sala = $1
    `;

    const responseDB = await database.query(sql, [idSala]);

    return Response.json(responseDB.rows, { status: 200 });

  } catch (error) {
    console.error("ERRO API JOGOS:", error);

    return Response.json(
      { error: "Erro ao buscar jogos" },
      { status: 500 }
    );
  }
}
