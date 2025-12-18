import Link from "next/link";
import styles from "./sala.module.css";
import { headers } from "next/headers";

export default async function Sala({ params }) {
  const { id } = params;

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol =
    process.env.NODE_ENV === "development" ? "http" : "https";

  const baseUrl = `${protocol}://${host}`;

  const resJogos = await fetch(
    `${baseUrl}/api/jogos?id_sala=${id}`,
    { cache: "no-store" }
  );

  const resSala = await fetch(
    `${baseUrl}/api/salas?id=${id}`,
    { cache: "no-store" }
  );

  if (!resJogos.ok) {
    throw new Error("Erro ao buscar jogos");
  }




  console.log("STATUS JOGOS:", resJogos.status);
console.log("URL:", resJogos.url);

const textoErro = await resJogos.text();
console.log("RESPOSTA:", textoErro);

if (!resJogos.ok) {
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
            <img src={jogo.linkimagem} alt="" />
            <h3>{jogo.titulo}</h3>
            <p>{jogo.categoria}</p>
            <p>{jogo.editora}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
