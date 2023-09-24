import { Selector } from '@/components/ui/select'

export function App() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // marginTop: '100px',
        width: '100vh',
        height: '100vh',
      }}
    >
      <Selector label={'Select'} />
    </div>
  )
}
