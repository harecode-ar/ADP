export const board = {
  columns: {
    '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1': {
      id: '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      name: 'To Do',
      taskIds: [
        '1-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
        '2-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
        '3-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
      ],
    },
    '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2': {
      id: '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
      name: 'In Progress',
      taskIds: [
        '4-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
        '5-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
      ],
    },
    '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3': {
      id: '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
      name: 'Ready To Test',
      taskIds: [],
    },
    '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4': {
      id: '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
      name: 'Done',
      taskIds: ['6-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6'],
    },
  },
  tasks: {
    '1-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1': {
      id: '1-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
      due: [null, null],
      status: 'To Do',
      labels: [],
      comments: [],
      assignee: [],
      priority: 'low',
      attachments: [],
      reporter: {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
        name: 'Angelique Morse',
        avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
      },
      name: 'Complete Project Proposal',
      description:
        'Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.',
    },
    '2-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2': {
      id: '2-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
      due: [1699471006662, 1699557406662],
      status: 'To Do',
      labels: ['Technology'],
      comments: [
        {
          id: 'd03d70c8-3d57-419d-95bb-200ac5e66579',
          name: 'Jayvion Simon',
          createdAt: '2023-11-06T19:16:46.662Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
          messageType: 'text',
          message:
            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        },
      ],
      assignee: [
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          name: 'Jayvion Simon',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        },
      ],
      priority: 'hight',
      attachments: [
        'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_12.jpg',
        'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_13.jpg',
        'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_14.jpg',
        'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_15.jpg',
      ],
      reporter: {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
        name: 'Angelique Morse',
        avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
      },
      name: 'Conduct Market Research',
      description:
        'Atque eaque ducimus minima distinctio velit. Laborum et veniam officiis. Delectus ex saepe hic id laboriosam officia. Odit nostrum qui illum saepe debitis ullam. Laudantium beatae modi fugit ut. Dolores consequatur beatae nihil voluptates rem maiores.',
    },
    '3-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3': {
      id: '3-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
      due: [1699557406662, 1699643806662],
      status: 'To Do',
      labels: ['Technology', 'Marketing'],
      comments: [
        {
          id: 'd03d70c8-3d57-419d-95bb-200ac5e66579',
          name: 'Jayvion Simon',
          createdAt: '2023-11-06T19:16:46.662Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
          messageType: 'text',
          message:
            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        },
        {
          id: '0f0a5658-4271-4bcf-811d-d94347542db3',
          name: 'Lucian Obrien',
          createdAt: '2023-11-05T18:16:46.662Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
          messageType: 'image',
          message: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg',
        },
      ],
      assignee: [
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          name: 'Jayvion Simon',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          name: 'Lucian Obrien',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        },
      ],
      priority: 'medium',
      attachments: [],
      reporter: {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
        name: 'Angelique Morse',
        avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
      },
      name: 'Design User Interface Mockups',
      description:
        'Rerum eius velit dolores. Explicabo ad nemo quibusdam. Voluptatem eum suscipit et ipsum et consequatur aperiam quia. Rerum nulla sequi recusandae illum velit quia quas. Et error laborum maiores cupiditate occaecati.',
    },
    '4-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4': {
      id: '4-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
      due: [1699643806662, 1699730206662],
      status: 'In Progress',
      labels: ['Technology', 'Marketing', 'Design'],
      comments: [
        {
          id: 'd03d70c8-3d57-419d-95bb-200ac5e66579',
          name: 'Jayvion Simon',
          createdAt: '2023-11-06T19:16:46.662Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
          messageType: 'text',
          message:
            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        },
        {
          id: '0f0a5658-4271-4bcf-811d-d94347542db3',
          name: 'Lucian Obrien',
          createdAt: '2023-11-05T18:16:46.662Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
          messageType: 'image',
          message: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg',
        },
        {
          id: 'a864193f-d98d-4d19-8d46-ae2269a3386e',
          name: 'Deja Brady',
          createdAt: '2023-11-04T17:16:46.663Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
          messageType: 'image',
          message: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg',
        },
      ],
      assignee: [
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          name: 'Jayvion Simon',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          name: 'Lucian Obrien',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          name: 'Deja Brady',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        },
      ],
      priority: 'hight',
      attachments: [],
      reporter: {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
        name: 'Angelique Morse',
        avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
      },
      name: 'Develop Backend API',
      description:
        'Et non omnis qui. Qui sunt deserunt dolorem aut velit cumque adipisci aut enim. Nihil quis quisquam nesciunt dicta nobis ab aperiam dolorem repellat. Voluptates non blanditiis. Error et tenetur iste soluta cupiditate ratione perspiciatis et. Quibusdam aliquid nam sunt et quisquam non esse.',
    },
    '5-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5': {
      id: '5-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
      due: [1699730206662, 1699816606662],
      status: 'In Progress',
      labels: ['Technology', 'Marketing', 'Design', 'Photography'],
      comments: [
        {
          id: 'd03d70c8-3d57-419d-95bb-200ac5e66579',
          name: 'Jayvion Simon',
          createdAt: '2023-11-06T19:16:46.662Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
          messageType: 'text',
          message:
            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        },
        {
          id: '0f0a5658-4271-4bcf-811d-d94347542db3',
          name: 'Lucian Obrien',
          createdAt: '2023-11-05T18:16:46.662Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
          messageType: 'image',
          message: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg',
        },
        {
          id: 'a864193f-d98d-4d19-8d46-ae2269a3386e',
          name: 'Deja Brady',
          createdAt: '2023-11-04T17:16:46.663Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
          messageType: 'image',
          message: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg',
        },
        {
          id: '8681384f-c37d-467f-9398-a2c6bc956d3d',
          name: 'Harrison Stein',
          createdAt: '2023-11-03T16:16:46.663Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
          messageType: 'text',
          message: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        },
      ],
      assignee: [
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          name: 'Jayvion Simon',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          name: 'Lucian Obrien',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          name: 'Deja Brady',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          name: 'Harrison Stein',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        },
      ],
      priority: 'medium',
      attachments: [],
      reporter: {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
        name: 'Angelique Morse',
        avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
      },
      name: 'Implement Authentication System',
      description:
        'Nihil ea sunt facilis praesentium atque. Ab animi alias sequi molestias aut velit ea. Sed possimus eos. Et est aliquid est voluptatem.',
    },
    '6-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6': {
      id: '6-task-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b6',
      due: [1699816606662, 1699903006662],
      status: 'Done',
      labels: ['Technology', 'Marketing', 'Design', 'Photography', 'Art'],
      comments: [
        {
          id: 'd03d70c8-3d57-419d-95bb-200ac5e66579',
          name: 'Jayvion Simon',
          createdAt: '2023-11-06T19:16:46.662Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
          messageType: 'text',
          message:
            'The sun slowly set over the horizon, painting the sky in vibrant hues of orange and pink.',
        },
        {
          id: '0f0a5658-4271-4bcf-811d-d94347542db3',
          name: 'Lucian Obrien',
          createdAt: '2023-11-05T18:16:46.662Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
          messageType: 'image',
          message: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg',
        },
        {
          id: 'a864193f-d98d-4d19-8d46-ae2269a3386e',
          name: 'Deja Brady',
          createdAt: '2023-11-04T17:16:46.663Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
          messageType: 'image',
          message: 'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg',
        },
        {
          id: '8681384f-c37d-467f-9398-a2c6bc956d3d',
          name: 'Harrison Stein',
          createdAt: '2023-11-03T16:16:46.663Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
          messageType: 'text',
          message: 'The aroma of freshly brewed coffee filled the air, awakening my senses.',
        },
        {
          id: '2d4e37f0-7a48-468b-b90b-7b7ee39ca14b',
          name: 'Reece Chung',
          createdAt: '2023-11-02T15:16:46.663Z',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
          messageType: 'text',
          message:
            'The children giggled with joy as they ran through the sprinklers on a hot summer day.',
        },
      ],
      assignee: [
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
          name: 'Jayvion Simon',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_1.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
          name: 'Lucian Obrien',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_2.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
          name: 'Deja Brady',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_3.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
          name: 'Harrison Stein',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_4.jpg',
        },
        {
          id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5',
          name: 'Reece Chung',
          avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_5.jpg',
        },
      ],
      priority: 'low',
      attachments: [
        'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_5.jpg',
        'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_6.jpg',
        'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_7.jpg',
        'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_8.jpg',
        'https://api-prod-minimal-v510.vercel.app/assets/images/cover/cover_9.jpg',
      ],
      reporter: {
        id: 'e99f09a7-dd88-49d5-b1c8-1daf80c2d7b17',
        name: 'Angelique Morse',
        avatarUrl: 'https://api-prod-minimal-v510.vercel.app/assets/images/avatar/avatar_17.jpg',
      },
      name: 'Write Test Cases',
      description:
        'Non rerum modi. Accusamus voluptatem odit nihil in. Quidem et iusto numquam veniam culpa aperiam odio aut enim. Quae vel dolores. Pariatur est culpa veritatis aut dolorem.',
    },
  },
  ordered: [
    '1-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1',
    '2-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b2',
    '3-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b3',
    '4-column-e99f09a7-dd88-49d5-b1c8-1daf80c2d7b4',
  ],
}
