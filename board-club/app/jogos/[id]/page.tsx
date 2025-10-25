interface Props {
  params: { id: string };
}

export default function DetalhesJogoPage({ params }: Props) {
  return <h1>Detalhes do Jogo {params.id}</h1>;
}
