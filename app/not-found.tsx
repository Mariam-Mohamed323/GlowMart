import { PackageX } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function NotFound() {
    return (
        <>
            <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white border rounded-lg shadow-sm p-8 text-center">

        <div className="flex justify-center mb-4">
          <PackageX className="w-12 h-12 text-gray-400" />
        </div>

        <h1 className="text-xl font-semibold mb-2">
          Page not found
        </h1>

        <p className="text-gray-500 text-sm mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        <div className="flex gap-3 justify-center">
          <Link
            href="/"
            className="px-4 py-2 text-sm rounded-md border hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>

          <Link
            href="/products"
            className="px-4 py-2 text-sm rounded-md bg-black text-white hover:opacity-90 transition"
          >
            Browse Products
          </Link>
        </div>
      </div>
    </div>
        </>
    )
}
