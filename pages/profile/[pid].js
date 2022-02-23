export default function ProfileProject(props) {
  return (
    <h1>Project {props.pid} - Specific Profile Form Page</h1>
  )
}

export async function getServerSideProps(context) {
  return {
    props: {pid: context.params.pid}, // will be passed to the page component as props
  }
}