import { Selector } from '@/components/ui/select'

export function App() {
  let data = ['lol', 'kek']
  let setSelectedValue = (value: string) => {
    console.log(value)
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vh',
        height: '100vh',
      }}
    >
      <Selector label={'Select'} selectData={data} setSelectedValue={setSelectedValue} />
    </div>
  )
}
