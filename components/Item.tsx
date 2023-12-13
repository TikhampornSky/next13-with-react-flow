const Item = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div
            style={{
                // width: '100vw',
                // height: '100vh',
                // display: 'flex',
                // flexDirection: 'column',
                // justifyContent: 'center',
                // alignItems: 'center',
                backgroundColor: 'white'
            }}
        >
            {children}
        </div>
    )
}

export default Item;