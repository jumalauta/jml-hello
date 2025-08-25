in vec2 texCoord;
out vec4 fragColor;

uniform vec2 fade;

void main()
{
    float fadeStart = fade.x;
    float fadeEnd = fade.y;

    float fade = smoothstep(fadeStart, fadeEnd, distance(texCoord,vec2(0.5, 0.5)));
    fragColor = vec4(0.,0.,0.,fade); 
}
