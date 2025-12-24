export const dynamic = "force-dynamic";

import Link from "next/link";
import styles from "./sala.module.css";

export default async function Sala({ params }) {
  const { id } = params;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const resJogos = await fetch(
    `/api/jogos?id_sala=${id}`,
    { cache: "no-store" }
  );

  const resSala = await fetch(
    `/api/salas?id=${id}`,
    { cache: "no-store" }
  );

  if (!resJogos.ok || !resSala.ok) {
    console.error("STATUS JOGOS:", resJogos.status);
    console.error("STATUS SALA:", resSala.status);
    throw new Error("Erro ao buscar jogos");
  }

  const jogos = await resJogos.json();
  const sala = await resSala.json();

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Jogos do {sala[0].nome}</h1>

        <Link href="/">Voltar ao início</Link>
        <Link href="/cadastrarJogos">Cadastre um jogo</Link>
      </div>

      <div className={styles.vitrine}>
        {jogos.map(jogo => (
          <div className={styles.card} key={jogo.id_jogo}>
            <img src={jogo.linkimagem} alt={jogo.titulo} />
            <h3>{jogo.titulo}</h3>
            <p>{jogo.categoria}</p>
            <p>{jogo.editora}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
