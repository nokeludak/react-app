import { useEffect, useState } from 'react';
import { insert, update, read, remove } from '../services/apiService';



const Course = ({ match, history }) => {
    const [requiredMessage, setMessage] = useState("");

    const [id] = useState(match.params.id);
    const [course, setCourse] = useState({
        _id: '0',
        name: '',
        points: '0'
    });

    useEffect(() => {
        if(id !== '0') {
            read('courses', id, data => {
                if(data) setCourse(data);
            })
        }
    }, [id]);

    function changeHandler(e) {
            setCourse({
            ...course,
        [e.target.name]: e.target.value
        });
    }

    const back = () => {
        history.push('/courses');
    }
    const save = () => {
        if (!course.name || !course.points) {
            setMessage('*This field is required');
        } else {

            if (id === '0') {
                delete course._id;
                insert('courses', course, data => {
                    if (data) return history.push('/courses');
                    console.log('There was an error during saving data');
                })
            } else {
                update('courses', id, course, data => {
                    if (data) return history.push('/courses');
                    console.log('There was an error during saving data');
                })
            }
        }
    }
    
    const del = () => {
        remove('courses', id, data => {
            history.push('/courses');
        })
    }


    return (
        <div className='container'>
            <h2>Course</h2>
            <form className='input-form'>
                <div className='fields'>
                    <div className='label'>
                        <label htmlFor='name'>Course name: </label>
                    </div>
                    <div className='input-field'>
                        <input type='text'
                            name='name' value={course.name}
                            onChange={changeHandler} />
                        <div className='msg'> {requiredMessage}</div>
                    </div>
                </div>
                <div className='fields'>
                    <div className='label'>
                        <label htmlFor='points'>Course points: </label>
                    </div>
                    <div className='input-field' >
                        <input type='text'
                            name='points' value={course.points}
                            onChange={changeHandler} />
                        <div className='msg'>{requiredMessage} </div>
                    </div>
                </div>
                <div className='buttons'>
                    {id !== '0' && (
                        <div className='left'>
                            <button type='button' onClick={del}>DELETE</button>
                        </div>
                        )}
                    <div className='right'>
                        <button type='button' onClick={back}>BACK</button>
                    &nbsp;&nbsp;
                    <button type='button' onClick={save}>SAVE</button>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default Course;