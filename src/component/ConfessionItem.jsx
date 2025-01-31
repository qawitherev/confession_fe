const ConfessionItem = ({ confession }) => {
    return (<>
        <div className='flex flex-col gap-1 px-5 py-10 bg-red-200 m-5'>
            {confession.title}
            <div className="flex flex-wrap">
                {confession.body}
            </div>

        </div>
    </>);
}

export default ConfessionItem;