'use client'

import { useState } from 'react'
import { useTransition } from 'react'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const DeleteConfirmation = ({ onDelete }) => {
    const pathname = usePathname()
  let [isPending, startTransition] = useTransition()

  const handleDelete = async () => {
    startTransition(() => {
      isPending = true
      onDelete()
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Image src="/assets/delete.svg" alt="edit" width={20} height={20} />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this List
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction onClick={handleDelete} className="flex-center p-16-semibold whitespace-nowrap bg-purple-gradient rounded-2xl bg-cover transition-all hover:bg-purple-100 hover:shadow-inner bg-white  text-red-700 w-32">
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteConfirmation;