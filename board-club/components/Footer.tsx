// components/Footer.tsx

import Link from 'next/link';
import { Mail, Phone, MapPin, Gamepad, Dices } from 'lucide-react'; // Ícones de Contato

export default function Footer() {
    const primaryColor = "text-emerald-800";
    const primaryBgColor = "bg-emerald-800";
    const accentColor = "text-yellow-400";

    return (
        // O footer ocupa a largura total e usa a cor primária de fundo
        <footer className={`w-full ${primaryBgColor} text-white py-10 mt-12 shadow-inner`}>
            <div className="max-w-6xl mx-auto px-8">
                
                {/* GRID DE TRÊS COLUNAS: Informações, Links e Contato */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 border-b pb-8 border-emerald-700">
                    
                    {/* COLUNA 1: LOGO E DESCRIÇÃO */}
                    <div>
                        <h3 className="text-2xl font-bold mb-3 flex items-center gap-2 text-yellow-400">
                            <Dices size={28} /> BoardClub
                        </h3>
                        <p className="text-sm text-emerald-100 mt-2">
                            A maior locadora de jogos de tabuleiro do Brasil. 
                            Diversão garantida, sem a necessidade de comprar!
                        </p>
                    </div>
                    
                    {/* COLUNA 2: NAVEGAÇÃO RÁPIDA */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 border-b border-yellow-400 pb-1">
                            Navegação
                        </h4>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/jogos" className="hover:text-yellow-400 transition">Catálogo</Link></li>
                            <li><Link href="/reservas" className="hover:text-yellow-400 transition">Minhas Reservas</Link></li>
                            <li><Link href="/perfil" className="hover:text-yellow-400 transition">Meu Perfil</Link></li>
                            <li><Link href="/sobre" className="hover:text-yellow-400 transition">Sobre Nós</Link></li>
                        </ul>
                    </div>
                    
                    {/* COLUNA 3: CONTATO E LOCALIZAÇÃO */}
                    <div>
                        <h4 className="text-lg font-semibold mb-4 border-b border-yellow-400 pb-1">
                            Fale Conosco
                        </h4>
                        <ul className="space-y-3 text-sm">
                            <li className="flex items-center gap-3">
                                <Mail size={18} className={accentColor} />
                                <a href="mailto:contato@boardclub.com" className="hover:text-yellow-400 transition">
                                    contato@boardclub.com
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className={accentColor} />
                                <a href="tel:+5511999999999" className="hover:text-yellow-400 transition">
                                    (11) 99999-9999
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className={accentColor} />
                                <span>
                                    Rua dos Jogadores, 123 - Centro, SP
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Direitos Autorais */}
                <div className="text-center text-xs text-emerald-200 pt-6">
                    &copy; {new Date().getFullYear()} BoardClub. Todos os direitos reservados.
                </div>
            </div>
        </footer>
    );
}