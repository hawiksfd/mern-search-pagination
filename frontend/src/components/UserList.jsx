import React from 'react'

const UserList = () => {
  return (
    <div className="container mt-5">
        <div className='columns'>
            <div className="column is-centered">
            <form>
                <div className="field has-addons">
                    <div className="control is-expanded">
                        <input 
                            type="text" 
                            className="input" 
                            placeholder='Find something here ...' />
                    </div>
                    <div className="control"></div>
                </div>
            </form>
            </div>
        </div>
    </div>
  )
}

export default UserList