const OwnPosts = ({ posts }) => {
    const d = new Date(posts.date_posted)
    const date = d.toString();
    const hours = date.substring(16, 18)
    const meridiem = hours >= 12 ? 'PM' : 'AM'
    const hour = (hours % 12) || 12

    return (
        <div className="card my-3 p-3 bg-body rounded shadow-sm">
            <div className="pb-3 mb-0 small lh-sm border-bottom">
                <dd className="card-text fs-4">{posts.post_description}</dd>
                <div className="row mb-3 bg-body rounded shadow-sm">
                    {posts.pictures.map ( (pics, post) => (
                        <div key={post} className="col my-2 p-2 bg-body rounded shadow-sm">
                            <img src={`http://localhost:8000/img/${pics}`} width="240px" height="240px" alt=""/>
                        </div>
                    ))}
                </div>
            </div>
                <time>{hour + date.substring(18, 21)} {meridiem} {date.substring(4, 10)}, {date.substring(11, 16)}</time>
        </div>
    )
}

export default OwnPosts