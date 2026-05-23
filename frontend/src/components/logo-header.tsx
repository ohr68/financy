import logo from '../assets/Logo.png'

export function LogoHeader () {
  return (
    <div className='flex w-full justify-center items-center py-6 px-2'>
      <img src={logo} height={32!} width={134} alt='Logo' />
    </div>
  )
}