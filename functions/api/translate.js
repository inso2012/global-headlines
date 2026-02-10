export async function onRequestPost(context) {
  const { env } = context;

  if (!env.AI) {
    return Response.json(
      { error: true, message: 'AI binding is not configured' },
      { status: 500 },
    );
  }

  let body;
  try {
    body = await context.request.json();
  } catch {
    return Response.json(
      { error: true, message: 'Invalid JSON body' },
      { status: 400 },
    );
  }

  const { texts, target, source = 'en' } = body;

  if (!texts || !Array.isArray(texts) || !target) {
    return Response.json(
      { error: true, message: 'Required: texts (array), target (string)' },
      { status: 400 },
    );
  }

  try {
    const translations = await Promise.all(
      texts.map(async (text) => {
        if (!text || text.trim() === '') return '';
        const result = await env.AI.run('@cf/meta/m2m100-1.2b', {
          text,
          source_lang: source,
          target_lang: target,
        });
        return result.translated_text || text;
      }),
    );

    return Response.json({ translations });
  } catch (err) {
    return Response.json(
      { error: true, message: err.message },
      { status: 500 },
    );
  }
}
