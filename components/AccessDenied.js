import { signIn } from "next-auth/react"
import Link from 'next/link'
import Button from '@mui/material/Button';

export default function AccessDenied() {
  return (
    <>
      <h1>Access Denied</h1>
      <p>
        You must 
        <Button 
          onClick={() => {
              signIn()
          }}>
            Sign in
        </Button>
        to view this page
      </p>
      <Button>
        <Link href="/project">Go to home page</Link>
      </Button>
    </>
  )
}
