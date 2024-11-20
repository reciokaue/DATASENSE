import { ChevronLeft, ChevronRight } from 'lucide-react'
import React, { useState } from 'react'

import { QuestionResult } from '@/api/get-question-results'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatResponse } from '@/utils/formatResponse'

const ITEMS_PER_PAGE = 5 // Número de itens por página

interface ResponseTableProps {
  question: QuestionResult
}

export function ResponsesTable({ question }: ResponseTableProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(question.responses.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const currentResponses = question.responses.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE,
  )

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1)
    }
  }

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1)
    }
  }

  return (
    <>
      <div className="flex flex-1">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Resposta</TableHead>
              <TableHead className="text-right">Quantidade</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentResponses.map((response, index) => (
              <TableRow key={index}>
                <TableCell>
                  {formatResponse(response.text, question.type)}
                </TableCell>
                <TableCell className="text-right">{response.count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm font-medium">
          Página {currentPage} de {totalPages}
        </div>
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handlePrev()}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
          <Button
            onClick={() => handleNext()}
            variant="outline"
            className="h-8 w-8 p-0"
            disabled={currentPage === 0}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Página anterior</span>
          </Button>
        </div>
      </div>
    </>
  )
}
