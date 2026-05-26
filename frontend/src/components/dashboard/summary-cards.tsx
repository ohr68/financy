import { Wallet, TrendingUp, TrendingDown, CircleArrowUp, CircleArrowDown } from 'lucide-react'

interface SummaryCardsProps {
  totalBalance: number
  monthlyIncomes: number
  monthlyExpenses: number
}

function formatCurrency(value: number) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
}

export function SummaryCards({ totalBalance, monthlyIncomes, monthlyExpenses }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <Wallet size={18} className='stroke-purple' />
          <span className="uppercase tracking-wide text-xs font-medium">Saldo total</span>
        </div>
        <p className="text-3xl font-bold text-gray-800">{formatCurrency(totalBalance)}</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <CircleArrowUp size={18} className='stroke-brand' />
          <span className="uppercase tracking-wide text-xs font-medium">Receitas do mês</span>
        </div>
        <p className="text-3xl font-bold text-gray-800">{formatCurrency(monthlyIncomes)}</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6">
        <div className="flex items-center gap-2 text-gray-500 text-sm mb-3">
          <CircleArrowDown size={18} className='stroke-red' />
          <span className="uppercase tracking-wide text-xs font-medium">Despesas do mês</span>
        </div>
        <p className="text-3xl font-bold text-gray-800">{formatCurrency(monthlyExpenses)}</p>
      </div>
    </div>
  )
}
