import { useState } from "react"
import { signUp } from "../services/auth"
import { useNavigate } from "react-router"

const SignUpForm = (props) => {

    const navigate = useNavigate()

    const initialState = {
        username: '',
        password: '',
        confirmPassword: '',
    }

    const [formData, setFormData] = useState(initialState)
    const [message, setMessage] = useState('')
    const[Error , setError] = useState('')

    const handleChange = (event) => {
        setFormData({...formData, [event.target.name]: event.target.value})
    }
    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
            if(formData.password.length<6){
                return setError('Password must be at least 6')
            }

            const newUser = await signUp(formData)
            props.setUser(newUser)
            setFormData(initialState)
            navigate('/')
        } catch (err) {
            setMessage(err.message)
        }
    }

    const isFormValid = () => {
        if(formData.username && formData.password && formData.password === formData.confirmPassword) {
            return true
        } else return false
    }

    return (
        <section className="card">
            <header>
                <h1>Sign Up</h1>
                <p>{message}</p>
            </header>
            <form onSubmit={handleSubmit}>
                Username:
                <input type="text" name="username" onChange={handleChange} value={formData.username} required className="signForm-input" />
                Password:
                <input type="password" name="password" onChange={handleChange} value={formData.password} required className="signForm-input" minLength={6} />
                Confirm Password:
                <input type="password" name="confirmPassword" onChange={handleChange} value={formData.confirmPassword} required className="signForm-input"/>
                <br/>
                <div className="actions">
                    <button type="submit" disabled={!isFormValid()}>Sign Up</button>
                    <button>Cancel</button>
                </div>
            </form>
        </section>
    )
}

export default SignUpForm

