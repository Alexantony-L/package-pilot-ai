// components/PackageCard.tsx

import { ExternalLink, Phone, Mail, Globe } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function PackageCard({ package: pkg }) {
  const travel = pkg["Travel Package Details"];
  const contact = pkg["Contact Information"];

  return (
  <Card className="flex flex-col mx-auto bg-gradient-to-br from-white via-slate-50 to-emerald-50 shadow-md hover:shadow-lg transition-shadow rounded-xl border border-gray-200 p-4">
  <CardHeader className="pb-2 border-b border-dashed border-emerald-300">
    <CardTitle className="text-lg font-semibold text-forest">
      {travel["Package Name"]}
    </CardTitle>
    <div className="flex flex-wrap gap-2 mt-3">
      {!pkg.AboveBudget && (
        <Badge variant="secondary" className="bg-green-600 text-white shadow-sm">
          Budget Friendly
        </Badge>
      )}
      <Badge variant="secondary" className="bg-forest text-white shadow-sm">
        AI Verified
      </Badge>
    </div>
  </CardHeader>

  <CardContent className="flex-1 flex flex-col justify-between gap-5 pt-4">
    <p className="text-sm text-gray-700 leading-relaxed">{travel.Description}</p>

    <div className="text-sm">
      <strong className="text-emerald-700">Inclusions:</strong>
      <ul className="list-disc list-inside mt-1 text-gray-800">
        {travel.Inclusions.slice(0, 3).map((item, i) => (
          <li key={i}>{item}</li>
        ))}
        {travel.Inclusions.length > 3 && <li>and more...</li>}
      </ul>
    </div>

    <div className="mt-2 text-sm text-rose-700 font-semibold">
      <strong>Price:</strong> {travel.Pricing}
    </div>

    <div className="mt-4">
      <Button
        asChild
        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold"
      >
        <a href={travel["Package Link"]} target="_blank" rel="noopener noreferrer">
          View Package <ExternalLink className="ml-2 w-4 h-4" />
        </a>
      </Button>
    </div>

    <div className="border-t pt-4 mt-4 text-sm text-gray-600 space-y-2">
      <div>
        <strong className="text-emerald-800">Agency:</strong> {pkg["Agency Name"]}
      </div>
      <div>
        <strong className="text-emerald-800">Contact:</strong> {pkg["Contact Person"]}
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <Phone className="w-4 h-4 text-forest" /> {contact.Phone}
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <Mail className="w-4 h-4 text-forest" /> {contact.Email}
      </div>
      <div className="flex items-center gap-2 text-gray-700">
        <Globe className="w-4 h-4 text-forest" />
        <a
          href={`https://${contact.Website}`}
          target="_blank"
          className="underline hover:text-forest transition-colors"
        >
          {contact.Website}
        </a>
      </div>
    </div>
  </CardContent>
</Card>

  )
}
