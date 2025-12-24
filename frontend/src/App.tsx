import './App.css'
import Api from './pages/Api'
import Home from './pages/Home'
import Docs from './pages/Docs'
import Nodes from './pages/Nodes'
import Terms from './pages/Terms'
import SignIn from './pages/SignIn'
import Node from './pages/NodeDocs'
import SignUp from './pages/SignUp'
import NodeId from './pages/NodeId'
import Methods from './pages/Method'
import Compare from './pages/Compare'
import Policies from './pages/Polocies'
import Settings from './pages/Settings'
import NotFound from './pages/NotFound'
import Watchlist from './pages/Watchlist'
import Terminologies from './pages/Terminologies'
import { NodeProvider } from './context/NodesContext'
import { Header , Footer } from './components/pageParts'
import { SocketProvider } from './context/SocketContext'
import { NotifierProvider } from './context/NotifierContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { ComparisonProvider } from './context/CompareContext'
import { BrowserRouter , Routes , Route, Navigate } from "react-router-dom"

function App() {
  function AppRoutes() {
    const { user } = useAuth()
    return (
      <Routes>

        <Route element={ <Home /> } path='/' />
        <Route element={ <NotFound /> } path='*' />
        <Route element={ <Docs /> } path={'/docs'} />
        <Route element={ <Nodes /> } path={'/nodes'} />
        <Route element={ <Api /> } path={'/docs/api'} />
        <Route path="/docs/terms" element={<Terms />} />
        <Route element={ <Compare /> } path={'/compare'} />
        <Route element={ <NodeId /> } path={'/nodes/:id'} />
        <Route path="/docs/methods" element={<Methods />} />
        <Route path="/docs/policies" element={<Policies />} />
        <Route element={ <Node /> } path={'/docs/NodeDocs'} />
        <Route path="/docs/terminologies" element={<Terminologies />} />
        <Route element={ user ? <Navigate to='/nodes'/> : <SignIn /> } path={'/signin'} />
        <Route element={ user ? <Navigate to='/nodes'/> : <SignUp /> } path={'/signup'} />
        <Route element={ user ? <Navigate to='/settings'/> : <></> } path={'/recovery'} />
        <Route element={ !user ? <Navigate to='/signin'/> : <Settings /> } path={'/settings'} />
        <Route element={ !user ? <Navigate to='/signin'/> : <Watchlist /> } path={'/watchlist'} />
      </Routes>
    )
  }

  return (
    <BrowserRouter>
      <AuthProvider>
        <NodeProvider>
          <ComparisonProvider>
            <SocketProvider>
              <NotifierProvider>
                <Header />
                <div className='background'></div>
                <AppRoutes />
                <Footer />
              </NotifierProvider>
            </SocketProvider>
          </ComparisonProvider>
        </NodeProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
