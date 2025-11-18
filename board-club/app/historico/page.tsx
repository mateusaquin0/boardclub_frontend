"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AuthGuard from "@/components/AuthGuard";
import { fetchUserData } from "@/services/usuarioService";
import { ArrowLeft, Calendar, CheckCircle } from "lucide-react";

interface ReservaAPI {
  id: string;
  dataRetirada: string;
  itens: Array<{ nome: string }>;
  status: "Pendente" | "Confirmada" | "Finalizada";
}

interface HistoricoItem {
  id: string;
  nome: string;
  data: string;
  status: "Devolvido";
}

const formatDate = (dateString: string) => {
  if (!dateString) return "N/A";
  return new Date(dateString + "T00:00:00").toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

export default function HistoricoPage() {
  const router = useRouter();
  const [historico, setHistorico] = useState<HistoricoItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const user = await fetchUserData(token);

      if (user) {
        const historicoFinalizado = user.reservas
        .filter(r => r.status === "Finalizada")
        .map(r => ({
            id: r.id,
            nome: r.itens[0]?.nome || "Reserva com múltiplos itens",
            data: formatDate(r.dataRetirada),
            status: "Devolvido" as const
        }));

        setHistorico(historicoFinalizado);
      }

      setLoading(false);
    };

    load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-xl font-semibold">Carregando histórico...</p>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-100 py-10 px-6">
        <div className="max-w-3xl mx-auto">

          {/* HEADER */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => router.push("/perfil")}
              className="p-2 rounded-lg bg-white shadow hover:bg-gray-100 transition"
            >
              <ArrowLeft size={20} />
            </button>

            <h1 className="text-3xl font-bold text-zinc-700">
              Histórico de Pedidos
            </h1>
          </div>

          {/* LISTA */}
          <div className="bg-white rounded-xl shadow-lg p-6 border">
            {historico.length === 0 ? (
              <p className="text-zinc-500 text-center">
                Nenhuma reserva finalizada ainda.
              </p>
            ) : (
              <ul className="space-y-4">
                {historico.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center border-b pb-3 last:border-none"
                  >
                    <span className="font-semibold text-zinc-700">
                      {item.nome}
                    </span>

                    <div className="flex items-center gap-2 text-emerald-600 text-sm">
                      <CheckCircle size={16} />
                      <span>{item.status}</span>
                      <span className="flex items-center gap-1 text-zinc-500">
                        <Calendar size={14} />
                        {item.data}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

        </div>
      </div>
    </AuthGuard>
  );
}
