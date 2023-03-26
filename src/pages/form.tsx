import { useForm } from 'react-hook-form';

const isValidEmail = (email: string) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );

const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
    },
  });
  const onSubmit = (data: any) => alert(JSON.stringify(data));

  const handleEmailValidation = (email: string) => {
    console.log('ValidateEmail was called with', email);

    const isValid = isValidEmail(email);

    const validityChanged = (errors.email && isValid) || (!errors.email && !isValid);
    if (validityChanged) {
      console.log('Fire tracker with', isValid ? 'Valid' : 'Invalid');
    }

    return isValid;
  };

  return (
    <div>
      <h1>Enter some stuff</h1>
      <form data-testid="form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input data-testid="input-name" type="text" placeholder="name" {...register('name', { required: true })} />
          {errors.name?.type === 'required' && (
            <p role="alert" data-testid="error-name-message">
              First name is required
            </p>
          )}
        </div>
        <div>
          <input
            data-testid="input-email"
            type="text"
            placeholder="email"
            {...register('email', { required: true, validate: handleEmailValidation })}
          />
          {errors.email && (
            <p role="alert" data-testid="error-email-message">
              Need a valid email
            </p>
          )}
        </div>

        <button type="submit" data-testid="form-button">
          Salvar
        </button>
        <input type="reset" />
      </form>
    </div>
  );
};

export default Form;
