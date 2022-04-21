import Link from 'next/link'
import Button from '@mui/material/Button';

export default function BasicProfileUncompletedPromt() {
  return (
    <>
      <h1>Just one more step...</h1>
      <p>
        You must 
        <Button>
          <Link href="/profile">Complete your basic profile first</Link>
        </Button>
        to register in this project
      </p>
    </>
  )
}
