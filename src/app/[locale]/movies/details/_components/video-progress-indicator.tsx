export default function VideoProgressIndicator() {
    return (
        <div className='w-1/2 h-1 bg-[#808080] rounded-full relative'>
            <div className='absolute left-0 top-0 h-1 w-1/5 bg-[#F50723] rounded-full'></div>

            <div className='absolute -top-[2px] left-[19%] w-2 h-2 bg-[#F50723] rounded-full'></div>
        </div>
    )
}
