
//TODO: APP 

app
//   .get('/hello',
//     clerkMiddleware()
//     ,(c) => {

//       const auth = getAuth(c); 

//       if(!auth?.userId){
//         return c.json({ error: "Unauthorized"})
//       }
//       return c.json({ 
//       msg: 'Hello',
//       userId: auth.userId
//     })
//   })
//   .get('/hello/:test',
//     zValidator("param", z.object({
//       test: z.string()
//     })),
//     ( c )=>{
//     const { test } = c.req.valid('param'); 

//     return c.json({
//       msg: "test 2",
//       test
//     })
//   })
//   .post('/',
//     zValidator("json", z.object({
//       name: z.string(),
//       userId: z.string()
//     })),
//     ( c )=>{
//     const { name, userId } = c.req.valid('json'); 

//     return c.json({
//       name,
//       userId
//     })

//   })  
