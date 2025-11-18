"use client";

import {
  User,
  CreditCard,
  History,
  Gamepad,
  Calendar,
  XCircle,
  CheckCircle,
  LogOut
} from "lucide-react";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";

import AuthGuard from "@/components/AuthGuard";
import { fetchUserData } from "@/services/usuarioService";

// ----------------- TIPOS -----------------
interface ReservaAPI {
  dataRetirada: string;
  itens: Array<{ nome: string }>;
  status: "Pendente" | "Confirmada" | "Finalizada";
  id: string;
}

interface UserDataFromAPI {
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  endereco?: string;
  reservas: ReservaAPI[];
}

interface JogosAtuaisUI {
  id: string;
  nome: string;
  dataReserva: string;
}

interface Historico {
  id: string;
  nome: string;
  data: string;
  status: "Devolvido";
}

interface FrontendUserData {
  nome: string;
  email: string;
  telefone?: string;
  cpf?: string;
  endereco?: string;
  plano: string;
  valorMensal: string;
  proximaCobranca: string;
  jogosAtuais: JogosAtuaisUI[];
  historicoRecente: Historico[];
}

const INITIAL_USER_DATA: FrontendUserData = {
  nome: "Carregando...",
  email: "...",
  plano: "Clube Ouro",
  valorMensal: "R$ 59,90",
  proximaCobranca: "20/12/2025",
  jogosAtuais: [],
  historicoRecente: []
};

// ----------------- FORMATAR DATA -----------------
const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
};

// ----------------- LOGOUT -----------------
const handleLogout = (router: any) => {
  localStorage.removeItem("authToken");
  router.push("/login");
};

// ----------------- COMPONENTE PRINCIPAL -----------------
export default function PerfilPage() {
  const router = useRouter();

  const [userData, setUserData] = useState<FrontendUserData>(INITIAL_USER_DATA);
  const [loadingData, setLoadingData] = useState(true);
  const [totalActiveReservations, setTotalActiveReservations] = useState(0);

  // ----------------- LOAD USER DATA -----------------
  useEffect(() => {
    const loadUserData = async () => {
      const token = localStorage.getItem("authToken");

      if (token) {
        const user = (await fetchUserData(token)) as UserDataFromAPI;

        if (user) {
          // Reservas ativas para "Jogos Atuais"
          const reservasAtivas = user.reservas.filter(
            (r) => r.status === "Pendente" || r.status === "Confirmada"
          );

          setTotalActiveReservations(reservasAtivas.length);

          const preview = reservasAtivas.slice(0, 2).map((reserva) => ({
            id: reserva.id,
            nome: reserva.itens[0]?.nome || "Reserva com múltiplos itens",
            dataReserva: formatDate(reserva.dataRetirada)
          }));

          // ----------- HISTÓRICO (Finalizadas) -----------
          const historicoFinalizado: Historico[] = user.reservas
            .filter((r) => r.status === "Finalizada")
            .map((r) => ({
              id: r.id,
              nome: r.itens[0]?.nome || "Reserva com múltiplos itens",
              data: formatDate(r.dataRetirada),
              status: "Devolvido"
            }));

          setUserData({
            ...INITIAL_USER_DATA,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            cpf: user.cpf,
            endereco: user.endereco,
            jogosAtuais: preview,
            historicoRecente: historicoFinalizado
          });
        }
      }
      setLoadingData(false);
    };

    loadUserData();
  }, []);

  const itemsInPreview = userData.jogosAtuais.length;
  const remainingItems = totalActiveReservations - itemsInPreview;

  const primaryColor = "text-emerald-800";
  const primaryBgColor = "bg-emerald-800";
  const lightBgColor = "bg-[#F7FEE7]";

  // ----------------- LOADING -----------------
  if (loadingData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <h2 className="text-xl font-semibold">Carregando dados do perfil...</h2>
      </div>
    );
  }

  // ----------------- PAGE -----------------
  return (
    <AuthGuard>
      <div className={`${lightBgColor} font-sans min-h-screen py-10`}>
        <div className="max-w-6xl mx-auto px-8">
          {/* CABEÇALHO */}
          <header className="mb-10 flex items-center justify-between border-b pb-4">
            <div className="flex items-center gap-4">
              <User size={36} className={primaryColor} />
              <h1 className={`text-3xl font-extrabold ${primaryColor}`}>
                Meu Perfil
              </h1>
            </div>

            <button
              onClick={() => handleLogout(router)}
              className="flex items-center gap-2 py-2 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition shadow-md"
            >
              <LogOut size={20} />
              Sair
            </button>
          </header>

          {/* GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* ESQUERDA */}
            <section className="md:col-span-2 space-y-8">
              {/* CARD 1 - PESSOAL */}
              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-zinc-700">
                  <User size={24} /> Dados Pessoais
                </h2>

                <div className="space-y-1">
                  <p className="text-lg font-medium text-zinc-800">
                    {userData.nome}
                  </p>
                  <p className="text-zinc-500 text-sm">{userData.email}</p>
                  <p className="text-zinc-500 text-sm">
                    Telefone: {userData.telefone || "Não Informado"}
                  </p>
                  <p className="text-zinc-500 text-sm">
                    CPF: {userData.cpf || "Não Informado"}
                  </p>
                  <p className="text-zinc-500 text-sm">
                    Endereço: {userData.endereco || "Não Informado"}
                  </p>
                </div>

                <button className="mt-4 text-sm font-semibold text-emerald-600 hover:text-emerald-700">
                  Editar Informações
                </button>
              </div>

              {/* CARD 2 - ASSINATURA */}
              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <h2
                  className={`text-2xl font-bold mb-4 flex items-center gap-2 ${primaryColor}`}
                >
                  <CreditCard size={24} /> Minha Assinatura
                </h2>

                <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-200">
                  <p className="text-sm font-semibold text-emerald-800">
                    Plano Atual:
                  </p>
                  <h3 className="text-3xl font-extrabold text-emerald-800 mb-2">
                    {userData.plano}
                  </h3>

                  <p className="text-lg text-zinc-600">
                    Mensalidade:{" "}
                    <span className="font-bold">{userData.valorMensal}</span>
                  </p>

                  <p className="text-sm text-zinc-500 mt-1">
                    Próxima Cobrança: {userData.proximaCobranca}
                  </p>
                </div>

                <div className="mt-6 flex gap-4">
                  <button
                    className={`py-3 px-6 ${primaryBgColor} text-white font-bold rounded-lg hover:bg-emerald-700 transition flex-grow`}
                  >
                    Alterar Plano
                  </button>

                  <button className="py-3 px-6 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition">
                    Cancelar
                  </button>
                </div>
              </div>
            </section>

            {/* DIREITA */}
            <section className="md:col-span-1 space-y-8">
              {/* CARD 3 - RESERVAS */}
              <div
                onClick={() => router.push("/reservas")}
                className="bg-white p-6 rounded-xl shadow-lg border cursor-pointer transition hover:scale-[1.02] hover:shadow-xl"
              >
                <div className="flex items-center justify-between border-b pb-3 mb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2 text-zinc-700">
                    <Gamepad size={24} /> Jogos Reservados
                  </h2>

                  <span className="text-sm font-semibold text-emerald-600 bg-emerald-100 px-3 py-1 rounded-full">
                    {totalActiveReservations} Ativo
                    {totalActiveReservations !== 1 ? "s" : ""}
                  </span>
                </div>

                {userData.jogosAtuais.length > 0 ? (
                  <ul className="space-y-3">
                    {userData.jogosAtuais.map((jogo) => (
                      <li
                        key={jogo.id}
                        className="flex justify-between items-center text-zinc-700"
                      >
                        <span className="font-medium truncate">{jogo.nome}</span>
                        <span className="text-sm flex items-center gap-1 text-zinc-500">
                          <Calendar size={14} />
                          {jogo.dataReserva}
                        </span>
                      </li>
                    ))}

                    {remainingItems > 0 && (
                      <li className="text-center text-sm text-emerald-600 border-t pt-2">
                        Ver mais {remainingItems} reserva
                        {remainingItems !== 1 ? "s" : ""}...
                      </li>
                    )}
                  </ul>
                ) : (
                  <p className="text-zinc-500 text-sm mt-2">
                    Nenhum jogo reservado no momento.
                  </p>
                )}
              </div>

              {/* CARD 4 - HISTÓRICO */}
              <div className="bg-white p-6 rounded-xl shadow-lg border">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-zinc-700">
                  <History size={24} /> Histórico Recente
                </h2>

                <ul className="space-y-3">
                  <button
                      onClick={() => router.push("/historico")}
                      className="mt-4 w-full py-2 px-4 bg-emerald-600 text-white font-semibold rounded-lg hover:bg-emerald-700 transition"
                    >
                      Ver Histórico Completo
                    </button>

                  {userData.historicoRecente.length === 0 && (
                    <p className="text-zinc-500 text-sm">
                      Nenhuma reserva finalizada ainda.
                    </p>
                  )}

                  {userData.historicoRecente.map((item) => (
                    <li
                      key={item.id}
                      className="flex justify-between items-center text-zinc-700 border-b pb-2 last:border-b-0"
                    >
                      <span className="font-medium">{item.nome}</span>

                      <span className="text-sm flex items-center gap-1 text-emerald-600">
                        <CheckCircle size={14} />
                        {item.status} ({item.data})
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
