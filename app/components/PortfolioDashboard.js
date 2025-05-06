import PortfolioBalance from './PortfolioBalance'
import PortfolioTable from './PortfolioTable'

export default function PortfolioDashboard() {
  return (
    <div className="p-6 max-w-6xl mx-auto">
      <PortfolioBalance />
      <PortfolioTable />
    </div>
  )
}
