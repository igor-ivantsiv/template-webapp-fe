import { Link } from 'react-router-dom'

interface Props {}

const Homepage = ({}: Props) => {
  return (
  <>
    <Link to={'/todos'}>To my todos</Link>
  </>
  )
}

export default Homepage