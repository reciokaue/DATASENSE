export function treatError(e: any) {
  const message = String(e?.response.data.message)
  console.log(e)
  return errors[message] || {}
}

const errors: any = {
  'Wrong password': {
    title: 'Senha incorreta',
    description: 'Não lembra a senha? clique em esqueci minha senha',
    variant: 'destructive',
  },
  'Email does not exist': {
    title: 'Email não existe',
    description: 'Verifique se digitou corretamente',
    variant: 'destructive',
  },
  undefined: {
    title: 'Erro interno do servidor',
    description: 'Tente novamente mais tarde',
    variant: 'destructive',
  },
}
