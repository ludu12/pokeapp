# Web App w/ React & Next.js

## Goals 📝

- Javascript + React
- Frameworks and other abstractions
- Building/deploying/developing
- How to think like a computer

## What is a web app?

## Is there a difference!

Website (e.g. Wikipedia)  
<img src="images/wiki.png" alt="wiki" width="50"/>

vs Web Application (e.g. Facebook, Gmail)  
<img src="images/facebook.png" alt="facebook" width="50"/>
<img src="images/gmail.png" alt="gmail" width="50"/>

## How is this done?

Javascript makes your site dynamic!  
And React is popular Javascript library.  
<img src="images/js.png" alt="js" width="50"/>
<img src="images/react.png" alt="react" width="50"/>

## How do software developers (you) create Web Applications?

## Version Control

- Git
- [GitHub](https://github.com/)

## IDEs (Integrated Development Environment)

- VSCode
- [GitPod](https://www.gitpod.io/)

## Open Source APIs

- React, Next.js (libraries/frameworks)
- [PokeAPI](https://beta.pokeapi.co/graphql/console/)
- [SpaceX API](https://api.spacex.land/graphql/)

## Hosting

- AWS
- Azure
- [Vercel](https://vercel.com/)

## What is react?

::: {.container}
:::: {.col}

A javascript library for building user interfaces

<img src="images/react.png" alt="react" width="300"/>

::::
:::: {.col}

- Declarative (car analogy)
- Component-Based (legos!)
- Use with DOM (web), Node (ssr web), React-Native (mobile)
- JSX (like html!)

::::
:::

## What is Next.js?

::: {.container}
:::: {.col}

Open source framework for building Web Apps

<img src="images/nextjs.png" alt="nextjs" width="300"/>

::::
:::: {.col}

- Server-side rendering
- Bundling (Babel/webpack)
- Static generation
- Serverless APIs
- Routes

::::
:::

## LET'S GET SETUP!

<img src="images/dwight-lets-do-this.gif" alt="lets do this" width="300"/>

## Github

::: {.container}
:::: {.col}

1. Go to `https://github.com/`
2. Click Sign up
3. Follow prompts

::::
:::: {.col}

<img src="images/github-prompt.png" alt="githubprompt" width="300"/>

::::
:::

## Gitpod

::: {.container}
:::: {.col}

1. Go to `https://www.gitpod.io/`
2. Click Login
3. Continue with GitHub
4. Follow OAuth prompt

::::
:::: {.col}

<img src="images/gitpod-login.png" alt="gitpotlogin" width="300"/>

::::
:::

## Gitpod cont...

::: {.container}
:::: {.col}

1. Settings -> Integrations
2. Github -> Edit Permissions
    1. User:email
    2. Read:user
    3. Public_repo
    4. Repo

::::
:::: {.col}

<img src="images/gitpod-permissions.png" alt="gitpodpermissions" width="300"/>

::::
:::

## Vercel

::: {.container}
:::: {.col}

1. Go to `https://vercel.com/`
2. Click Sign Up
3. Continue with Github
4. Follow OAuth prompt

::::
:::: {.col}

<img src="images/vercel-login.png" alt="vercellogin" width="300"/>

::::
:::

## Break?

## Let's Deploy 🚀

## Let's Deploy 🚀

1. Fork

```
https://github.com/ludu12/pokeapp
```

2. Go to Vercel and import the pokeapp repo
3. Watch it deploy!

## Let's make an update ⚒️

1. Go to (using your github username):

```
gitpod.io/#https://github.com/{your-username}/pokeapp
```  

2. Make a change
3. Commit and push!... watch it deploy

<img src="images/gitpod-popup.png" alt="popup" width="300"/>


## More updates!

1. Go to `/pages/index.js`
2. Bring our home page to life!

## We have broken code! 

<img src="images/kermit-worried.gif" alt="kermit" width="300"/>


## Let's fix it
1. Go to `/lib/use-deck.js`
2. `toggleHandler` is our problem!
3. Optional: In terminal run `npm run test`

## Think like a computer (algorithm)
1. Computers are fast, consistent idiots
2. For things to work properly, we must think of all use cases
3. We can also look in our toolbox for abstractions [mdn](developer.mozilla.or)

## Thanks!
<img src="images/pikachu.png" alt="pikachu"/>

<style>
.container{
  display: flex;
}
.col {
  flex: 1;
}
</style>
