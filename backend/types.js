const zod = require("zod")

const TodoParser = zod.object({
    title:zod.string(),
    description: zod.string(),
    // created: zod.string().date()
})

const CompletedParser = zod.object({
    id:zod.string()
})

module.exports= {
    TodoParser,
    CompletedParser
}
