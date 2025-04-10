import React, { useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import axios from 'axios';
import { toast } from 'sonner';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useSelector } from 'react-redux';

const Signup = () => {
  const [input, setInput] = useState({
    username: '',
    email: '',
    password: '',
    otp: ''
  });

  const [loading, setLoading] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const otpInputRef = useRef(null);
  const navigate = useNavigate();
  const { user } = useSelector(store => store.auth);

  const changeHandler = (e) => {
    setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const sendOtpHandler = async () => {
    if (!input.email) return toast.error("Please enter your email to get OTP");
    if (!isValidEmail(input.email)) return toast.error("Please enter a valid email address");

    try {
      setOtpLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/sendOtp', {
        email: input.email
      });

      if (res.data.message) {
        toast.success("OTP sent successfully to your email");
        setOtpSent(true);
        setTimeout(() => otpInputRef.current?.focus(), 200);
      }
    } catch (error) {
      console.error("Send OTP Error:", error);
      toast.error(error.response?.data?.message || "Failed to send OTP");
    } finally {
      setOtpLoading(false);
    }
  };

  const signupHandler = async (e) => {
    e.preventDefault();
    if (!input.otp) return toast.error("Please enter the OTP to register");

    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8000/api/v1/user/register', input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });

      if (res.data.success || res.status === 201) {
        toast.success(res.data.message);
        setInput({ username: "", email: "", password: "", otp: "" });
        setTimeout(() => navigate("/login"), 1000);
      }
    } catch (error) {
      console.error("Signup Error:", error);
      toast.error(error.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100 px-4'>
      <form
        onSubmit={signupHandler}
        className='bg-white shadow-xl rounded-2xl px-8 py-10 w-full max-w-md flex flex-col gap-5 border border-gray-200'
      >
        <div className='text-center mb-4'>
          <h1 className='text-2xl font-bold text-blue-600'>SyncroLink</h1>
          <p className='text-sm text-gray-500'>Sign up to see photos & videos from your friends</p>
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>Username</label>
          <Input
            type="text"
            name="username"
            value={input.username}
            onChange={changeHandler}
            placeholder="your_username"
            className="focus-visible:ring-blue-300"
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>Email</label>
          <Input
            type="email"
            name="email"
            value={input.email}
            onChange={changeHandler}
            placeholder="you@example.com"
            className="focus-visible:ring-blue-300"
          />
        </div>

        <div className='flex flex-col gap-1'>
          <label className='text-sm font-medium'>Password</label>
          <Input
            type="password"
            name="password"
            value={input.password}
            onChange={changeHandler}
            placeholder="••••••••"
            className="focus-visible:ring-blue-300"
          />
        </div>

        <div className='flex flex-col gap-2'>
          <Button
            type="button"
            onClick={sendOtpHandler}
            disabled={otpLoading || !input.email}
            className='w-full'
          >
            {otpLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending OTP...
              </>
            ) : (
              "Get OTP"
            )}
          </Button>

          {otpSent && (
            <Input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              value={input.otp}
              onChange={changeHandler}
              ref={otpInputRef}
              className="focus-visible:ring-blue-300"
            />
          )}
        </div>

        <Button type="submit" disabled={loading} className='w-full mt-2'>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait...
            </>
          ) : (
            "Signup"
          )}
        </Button>

        <p className='text-center text-sm mt-4 text-gray-600'>
          Already have an account?{' '}
          <Link to="/login" className='text-blue-600 hover:underline'>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
