const auth = {
  register: {
    operation: {
      summary: 'Registrar novo usuário',
      description: 'Cria uma nova conta de usuário no sistema',
    },
    response: {
      success: {
        status: 201,
        description: 'Usuário registrado com sucesso',
        schema: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              example: 'Usuário registrado com sucesso',
            },
          },
        },
      },
      conflict: {
        status: 409,
        description: 'Dados inválidos ou email já existe',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 409 },
            message: {
              type: 'array',
              items: { type: 'string' },
              example: ['Email já está em uso'],
            },
            error: { type: 'string', example: 'Conflict' },
          },
        },
      },
    },
  },
  login: {
    operation: {
      summary: 'Fazer login',
      description: 'Autentica o usuário e retorna um token JWT',
    },
    response: {
      success: {
        status: 200,
        description: 'Login realizado com sucesso',
        schema: {
          type: 'object',
          properties: {
            access_token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
            },
            user: {
              type: 'object',
              properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'João Silva' },
                email: { type: 'string', example: 'joao@email.com' },
              },
            },
          },
        },
      },
      unauthorized: {
        status: 401,
        description: 'Credenciais inválidas',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
            message: { type: 'string', example: 'Credenciais inválidas' },
            error: { type: 'string', example: 'Unauthorized' },
          },
        },
      },
    },
  },
  validateToken: {
    operation: {
      summary: 'Validar token JWT',
      description:
        'Verifica se o token JWT é válido e retorna os dados do usuário autenticado',
    },
    response: {
      success: {
        status: 200,
        description: 'Token válido - retorna dados do usuário',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'João Silva' },
            email: { type: 'string', example: 'joao@email.com' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      unauthorized: {
        status: 401,
        description: 'Token inválido ou expirado',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
            message: { type: 'string', example: 'Unauthorized' },
          },
        },
      },
    },
  },
};

const category = {
  create: {
    operation: {
      summary: 'Criar nova categoria',
      description:
        'Cria uma nova categoria de transação para o usuário autenticado',
    },
    response: {
      success: {
        status: 201,
        description: 'Categoria criada com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            name: { type: 'string', example: 'Despesas fixas' },
            description: {
              type: 'string',
              example: 'Categoria para despesas fixas mensais',
            },
            color: { type: 'string', example: '#FF5733' },
            userId: { type: 'number', example: 1 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      conflict: {
        status: 409,
        description: 'Categoria com este nome já existe',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 409 },
            message: {
              type: 'string',
              example:
                'Category with name "Despesas fixas" already exists for user with ID 1',
            },
            error: { type: 'string', example: 'Conflict' },
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Dados inválidos',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'array',
              items: { type: 'string' },
              example: [
                'name should not be empty',
                'A cor deve estar no formato hex',
              ],
            },
            error: { type: 'string', example: 'Bad Request' },
          },
        },
      },
      unauthorized: {
        status: 401,
        description: 'Token inválido ou não fornecido',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
            message: { type: 'string', example: 'Unauthorized' },
          },
        },
      },
    },
  },
  list: {
    operation: {
      summary: 'Listar categorias do usuário',
      description: 'Retorna todas as categorias do usuário autenticado',
    },
    response: {
      success: {
        status: 200,
        description: 'Lista de categorias retornada com sucesso',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              name: { type: 'string', example: 'Despesas fixas' },
              description: {
                type: 'string',
                example: 'Categoria para despesas fixas mensais',
              },
              color: { type: 'string', example: '#FF5733' },
              userId: { type: 'number', example: 1 },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
      unauthorized: {
        status: 401,
        description: 'Token inválido ou não fornecido',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
            message: { type: 'string', example: 'Unauthorized' },
          },
        },
      },
    },
  },
};

const transaction = {
  create: {
    operation: {
      summary: 'Criar nova transação',
      description:
        'Cria uma nova transação financeira para o usuário autenticado',
    },
    response: {
      success: {
        status: 201,
        description: 'Transação criada com sucesso',
        schema: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            description: { type: 'string', example: 'Salário mensal' },
            amount: { type: 'number', example: 5000.0 },
            type: {
              type: 'string',
              enum: ['INCOME', 'EXPENSE'],
              example: 'INCOME',
            },
            date: { type: 'string', format: 'date-time' },
            userId: { type: 'number', example: 1 },
            categoryId: { type: 'number', example: 1, nullable: true },
            category: {
              type: 'object',
              nullable: true,
              properties: {
                id: { type: 'number', example: 1 },
                name: { type: 'string', example: 'Renda' },
                color: { type: 'string', example: '#00FF00' },
                description: {
                  type: 'string',
                  example: 'Categoria para rendas',
                },
              },
            },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
      conflict: {
        status: 409,
        description: 'Categoria especificada não existe',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 409 },
            message: {
              type: 'string',
              example: 'A categoria com o ID 999 não existe.',
            },
            error: { type: 'string', example: 'Conflict' },
          },
        },
      },
      badRequest: {
        status: 400,
        description: 'Dados inválidos',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 400 },
            message: {
              type: 'array',
              items: { type: 'string' },
              example: [
                'description must be a string',
                'amount must be a number',
                'type must be a valid enum value',
              ],
            },
            error: { type: 'string', example: 'Bad Request' },
          },
        },
      },
      unauthorized: {
        status: 401,
        description: 'Token inválido ou não fornecido',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
            message: { type: 'string', example: 'Unauthorized' },
          },
        },
      },
    },
  },
  list: {
    operation: {
      summary: 'Listar transações do usuário',
      description:
        'Retorna todas as transações do usuário autenticado ordenadas por data decrescente',
    },
    response: {
      success: {
        status: 200,
        description: 'Lista de transações retornada com sucesso',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', example: 1 },
              description: { type: 'string', example: 'Salário mensal' },
              amount: { type: 'number', example: 5000.0 },
              type: {
                type: 'string',
                enum: ['INCOME', 'EXPENSE'],
                example: 'INCOME',
              },
              date: { type: 'string', format: 'date-time' },
              userId: { type: 'number', example: 1 },
              categoryId: { type: 'number', example: 1, nullable: true },
              category: {
                type: 'object',
                nullable: true,
                properties: {
                  id: { type: 'number', example: 1 },
                  name: { type: 'string', example: 'Renda' },
                  color: { type: 'string', example: '#00FF00' },
                  description: {
                    type: 'string',
                    example: 'Categoria para rendas',
                  },
                },
              },
              createdAt: { type: 'string', format: 'date-time' },
              updatedAt: { type: 'string', format: 'date-time' },
            },
          },
        },
      },
      unauthorized: {
        status: 401,
        description: 'Token inválido ou não fornecido',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
            message: { type: 'string', example: 'Unauthorized' },
          },
        },
      },
    },
  },
  balance: {
    operation: {
      summary: 'Obter resumo financeiro',
      description:
        'Retorna o resumo financeiro do usuário com total de receitas, despesas e saldo',
    },
    response: {
      success: {
        status: 200,
        description: 'Resumo financeiro retornado com sucesso',
        schema: {
          type: 'object',
          properties: {
            income: {
              type: 'number',
              example: 8000.0,
              description: 'Total de receitas',
            },
            expense: {
              type: 'number',
              example: 3500.0,
              description: 'Total de despesas',
            },
            balance: {
              type: 'number',
              example: 4500.0,
              description: 'Saldo atual (receitas - despesas)',
            },
          },
        },
      },
      unauthorized: {
        status: 401,
        description: 'Token inválido ou não fornecido',
        schema: {
          type: 'object',
          properties: {
            statusCode: { type: 'number', example: 401 },
            message: { type: 'string', example: 'Unauthorized' },
          },
        },
      },
    },
  },
};

export const swagger = {
  auth: auth,
  category: category,
  transaction: transaction,
};
