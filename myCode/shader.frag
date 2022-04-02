#version 330 core

out vec4 FragColor;

in vec3 Normal;
in vec3 FragPos;
in vec2 TexCoord;

uniform vec3 lightPos;
uniform vec3 lightColor;
uniform vec3 objectColor;
uniform sampler2D texture1;
uniform sampler2D texture2;

uniform vec3 viewPos;

uniform float ambientI;
uniform float mixParam;

void main()

{
	//Luz ambiente:
	vec3 ambient = ambientI * lightColor;

	//Luz difusa:
	vec3 norm = normalize(Normal);
	vec3 lightDir = normalize(lightPos - FragPos);
	float diff = max(dot(norm,lightDir),0.0);
	vec3 diffuse = diff * lightColor;

	//Luz especular:
	float specularI = 0.7f;
	vec3 viewDir = normalize(viewPos - FragPos);
	vec3 reflectDir = reflect(-lightDir, norm);
	float spec = pow(max(dot(viewDir,reflectDir),0.0),128);
	vec3 specular = specularI * spec * lightColor;

	vec3 result = (ambient + diffuse + specular) * objectColor * (mix(texture(texture1,TexCoord).rgb,texture(texture2,TexCoord).rgb,mixParam));
	gl_FragColor = vec4 (result,1.0f);
}