export default function ProjectProfileShow(props) {
  return (
    <h1>User{props.uid}'s Project{props.pid}-Specific Profile Page</h1>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {// will be passed to the page component as props
      pid: context.params.pid,
      uid: context.params.uid
    }, 
  }
}