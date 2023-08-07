import { useState } from 'react';
import { ReactComponent as BrandLogo } from '../../assets/icons/logo.svg';
import { Alert, Form, Spinner } from 'reactstrap';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { InputMask } from 'primereact/inputmask';
import {
  Block,
  BlockContent,
  BlockDes,
  BlockHead,
  BlockTitle,
  Icon,
  PreviewCard,
} from '../../components';
import Button from '../../components/button/button';
import AuthFooter from '../components/auth-footer';
import { useMutation } from 'react-query';
import { loginMutationFn } from '../../react-query/mutations';
import { ERROR_MESSAGE_TRANSLATIONS } from '../../utils/enums/auth.enum';

const Login = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorValidation, setErrorValidation] = useState(null);

  const loginMutation = useMutation({
    mutationKey: ['user'],
    mutationFn: (formData) => loginMutationFn(formData),
    onSuccess: (res) => onSuccessFn(res),
  });

  const onSuccessFn = (res) => {
    if (res?.error) {
      return setErrorValidation(ERROR_MESSAGE_TRANSLATIONS[res.error.message]);
    }

    localStorage.setItem('u_at', res.data.token);
    const callbackUri = window.location.href.split('=')[1];
    window.location.replace(callbackUri || window.location.origin);
  };

  const onFormSubmit = async (formData) => {
    const regex = /\((\d{2})\) (\d{3})-(\d{2})-(\d{2})/;
    formData.phone = formData.phone.replace(regex, '$1$2$3$4');
    loginMutation.mutateAsync(formData);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phone: '991234567',
      password: '1234567',
    },
  });

  return (
    <>
      <Block className="nk-block-middle nk-auth-body  wide-xs">
        <div className="brand-logo pb-4 text-center">
          <Link to="/" className="logo-link">
            <BrandLogo />
          </Link>
        </div>

        <PreviewCard className="card-bordered" bodyClass="card-inner-lg">
          <BlockHead>
            <BlockContent>
              <BlockTitle tag="h4">Kirish</BlockTitle>
              <BlockDes>
                <p>Shartnoma tizimiga faqat ro’yxatdan o’tgan foydalanuvchilar kirishi mumkin</p>
              </BlockDes>
            </BlockContent>
          </BlockHead>
          {errorValidation && (
            <div className="mb-3">
              <Alert color="danger" className="alert-icon">
                <Icon name="alert-circle" /> {errorValidation}
              </Alert>
            </div>
          )}
          <Form className="is-alter" onSubmit={handleSubmit(onFormSubmit)}>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="default-01">
                  Telefon raqami
                </label>
              </div>
              <div className="form-control-wrap">
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">+998</span>
                  </div>
                  <InputMask
                    id="phone"
                    {...register('phone', {
                      required: 'This field is required',
                    })}
                    className="form-control-lg form-control"
                    mask="(99) 999-99-99"
                    placeholder="(99) 999-99-99"
                  />
                  {errors.name && <span className="invalid">{errors.name.message}</span>}
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="form-label-group">
                <label className="form-label" htmlFor="password">
                  Parol
                </label>
              </div>
              <div className="form-control-wrap">
                <span
                  onClick={() => setIsPasswordVisible((prevVal) => !prevVal)}
                  className={`form-icon lg form-icon-right passcode-switch cursor-pointer ${
                    isPasswordVisible ? 'is-hidden' : 'is-shown'
                  }`}
                >
                  <Icon name="eye" className="passcode-icon icon-show"></Icon>

                  <Icon name="eye-off" className="passcode-icon icon-hide"></Icon>
                </span>
                <input
                  autoComplete="new-password"
                  type={isPasswordVisible ? 'text' : 'password'}
                  id="password"
                  {...register('password', {
                    required: 'This field is required',
                  })}
                  placeholder="Parolingizni kiriting"
                  className={`form-control-lg form-control ${
                    isPasswordVisible ? 'is-hidden' : 'is-shown'
                  }`}
                />
                {errors.passcode && <span className="invalid">{errors.passcode.message}</span>}
              </div>
            </div>
            <div className="form-group">
              <Button size="lg" className="btn-block" type="submit" color="primary">
                {loginMutation.isLoading ? <Spinner size="sm" color="light" /> : 'Kirish'}
              </Button>
            </div>
          </Form>
        </PreviewCard>
      </Block>
      <AuthFooter />
    </>
  );
};
export default Login;
