interface Props {
  params: { id: string };
}

export default function DetalhesLojaPage({ params }: Props) {
  return <h1>Detalhes da Loja {params.id}</h1>;
}
