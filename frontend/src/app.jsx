import styled from 'styled-components'
import GlobalStyles from './styles/GlobalStyles'




const StyledApp = styled.div`
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

function App() {
 return (
  <>
    <GlobalStyles />
    <StyledApp>

      <h1>React App</h1>
    </StyledApp> 
  </>
  )
}

export default App
