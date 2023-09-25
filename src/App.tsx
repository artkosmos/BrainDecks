import { Selector } from '@/components/ui/select'

export function App() {
  let data = ['lol', 'kek']

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
      <Selector label={'Select'} selectData={data} />
    </div>
  )
}
